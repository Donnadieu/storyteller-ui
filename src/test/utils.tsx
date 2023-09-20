import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { FeatureFlagProvider } from 'features/FeatureFlags'

// For notes on updating the wrapper: https://testing-library.com/docs/react-testing-library/setup
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <FeatureFlagProvider>{children}</FeatureFlagProvider>
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'

export { customRender as render }
