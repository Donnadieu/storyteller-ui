import React from 'react'
import mockAxios from 'jest-mock-axios'
import { renderInMemoryRouter, screen, waitFor, waitForElementToBeRemoved } from 'test/utils'

import Feature from './Feature'

// Fixing the "not wrapped in act(...)" warning: https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning
describe('<Feature />', () => {
  const hostSpy = jest.spyOn(global.window.location, 'host', 'get')
  const locationSearchSpy = jest.spyOn(global.window.location, 'search', 'get')
  const hrefSpy = jest.spyOn(global.window.location, 'href', 'get')

  beforeAll(() => {
    // const { location } = global.window
    // console.debug({ search: location.search })
    hostSpy.mockReturnValue('storysprout.test')
    locationSearchSpy.mockReturnValue('u=User;99')
    hrefSpy.mockImplementation(() => `${window.location.protocol}//${window.location.host}?${window.location.search}`)

    console.debug({ href: window.location.href, hostname: window.location.hostname })
  })

  afterEach(() => {
    mockAxios.reset()
  })

  test('renders when flag is enabled', async () => {
    mockAxios.get.mockResolvedValueOnce({ data: { features: [{ key: 'feat__hello', state: 'on' }] } })
    renderInMemoryRouter(<Feature flag="feat__hello">Hello</Feature>)
    await waitFor(() => mockAxios.get)
    expect(mockAxios.get).toHaveBeenCalledTimes(1)
    await screen.findByText('Hello')
  })

  test('does NOT render when flag is disabled', async () => {
    mockAxios.get.mockResolvedValueOnce({ data: { features: [{ key: 'feat__hello', state: 'off' }] } })
    renderInMemoryRouter(<Feature flag="feat__hello">Hello</Feature>)
    await waitFor(() => mockAxios.get)
    expect(mockAxios.get).toHaveBeenCalledTimes(1)
    expect(screen.queryByText('Hello')).not.toBeInTheDocument()
  })

  test('does NOT render when flag is not defined', async () => {
    mockAxios.get.mockResolvedValueOnce({ data: { features: [] } })
    renderInMemoryRouter(<Feature flag="feat__hello">Hello</Feature>)
    await waitFor(() => mockAxios.get)
    expect(mockAxios.get).toHaveBeenCalledTimes(1)
    expect(screen.queryByText('Hello')).not.toBeInTheDocument()
  })

  describe('with offSwitch', () => {
    test('does NOT render when flag is enabled', async () => {
      mockAxios.get.mockResolvedValueOnce({ data: { features: [{ key: 'feat__new_stuff', state: 'on' }] } })
      renderInMemoryRouter(
        <Feature flag="feat__new_stuff" offSwitch>
          Legacy feature
        </Feature>
      )
      await waitFor(() => mockAxios.get)
      expect(mockAxios.get).toHaveBeenCalledTimes(1)
      await waitForElementToBeRemoved(() => screen.queryByText('Legacy feature'))
      expect(screen.queryByText('Legacy feature')).not.toBeInTheDocument()
    })

    test('renders when flag is disabled', async () => {
      mockAxios.get.mockResolvedValueOnce({ data: { features: [{ key: 'feat__new_stuff', state: 'off' }] } })
      renderInMemoryRouter(
        <Feature flag="feat__new_stuff" offSwitch>
          Legacy feature
        </Feature>
      )
      await waitFor(() => mockAxios.get)
      expect(mockAxios.get).toHaveBeenCalledTimes(1)
      await screen.findByText('Legacy feature')
    })

    test('renders when flag is not defined', async () => {
      mockAxios.get.mockResolvedValueOnce({ data: { features: [] } })
      renderInMemoryRouter(
        <Feature flag="feat__new_stuff" offSwitch>
          Legacy feature
        </Feature>
      )
      await waitFor(() => mockAxios.get)
      expect(mockAxios.get).toHaveBeenCalledTimes(1)
      await screen.findByText('Legacy feature')
    })
  })
})
