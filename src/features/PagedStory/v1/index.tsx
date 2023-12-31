import React, { useCallback, useContext } from 'react'

import Grid, { GridProps } from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import CircularProgress from '@mui/material/CircularProgress'

import withRoot from 'themes/onepirate/modules/withRoot'
import Button from 'themes/onepirate/components/Button'
import Story from './modules/views/Story'
import StackableItem from 'components/shared/StackableItem'

import { useAuth } from 'components/shared/AuthProvider'
import { useGenerateStory, useStoryPromptVariables } from 'hooks'
import { heroes, places, characters, subjects, objects, ages, writingStyles } from 'lib/prompts'
import { nullSafeStringOrValue } from 'lib'

import StoryBuilder from 'features/StoryBuilder'
import useContactInfo from 'hooks/useContactInfo'
import useRequestStoryV2 from 'features/StoryBuilder/hooks/useRequestStoryV2'
import FEATURE_FLAGS from 'lib/features'
import Feature from 'features/FeatureFlags/Feature'
import { useFeatureFlagsContext } from 'features/FeatureFlags'

function CenteredRowItem({ children, ...otherProps }: GridProps) {
  return (
    <>
      <StackableItem sx={{ display: { xs: 'none', md: 'flex' } }} />
      <StackableItem>{children}</StackableItem>
      <StackableItem sx={{ display: { xs: 'none', md: 'flex' } }} />
    </>
  )
}

// Theme: https://mui.com/store/items/onepirate/
function PagedStoryV1() {
  const contactInfo = useContactInfo()
  const { user } = useAuth()
  const {
    hero,
    setHero,
    place,
    setPlace,
    character,
    setCharacter,
    object,
    setObject,
    age,
    setAge,
    subject,
    setSubject,
    writingStyle,
    setWritingStyle,
    composePrompt
  } = useStoryPromptVariables()
  const { loading: loadingV1, storyPages: storyPagesV1, requestStory } = useGenerateStory()
  const { loading: loadingV2, storyPages: storyPagesV2, requestStory: requestStoryV2 } = useRequestStoryV2()
  const { isEnabled } = useFeatureFlagsContext()
  const sbContext = useContext(StoryBuilder.Context)
  const sbServiceIsEnabled = isEnabled(FEATURE_FLAGS.STORY_BUILDER_SERVICE)

  const hideStoryBuilderDrawerOnSuccess = async () => {
    const autoClick = new MouseEvent('click', { bubbles: true })
    sbContext.toggleDrawer('bottom', false)(autoClick as any)
  }

  const generateStory = useCallback(async () => {
    if (sbServiceIsEnabled) {
      // Test V2
      await requestStoryV2({ hero, place, character, object, age, subject }, hideStoryBuilderDrawerOnSuccess)
    } else {
      const prompt = composePrompt()
      await requestStory(prompt, hideStoryBuilderDrawerOnSuccess)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [composePrompt, requestStory, sbContext.toggleDrawer, sbServiceIsEnabled])

  const loading = loadingV1 || loadingV2
  const storyPages = sbServiceIsEnabled ? storyPagesV2 : storyPagesV1

  return (
    <>
      {/* Will show the story - when it's ready */}
      <Story loading={loading} pages={storyPages} />

      <Grid
        container
        sx={{
          display: 'flex',
          overflowY: 'hidden',
          minHeight: '85vh',
          flexDirection: 'column',
          flexGrow: 1,
          padding: 1,
          justifyContent: 'center'
        }}
      >
        <Typography variant="h3">You haven&apos;t saved any stories</Typography>
        <Typography variant="subtitle1">
          We&apos;re working on a feature for saving your stories.
          <p />
          Have an idea for a feature you&apos;d like us to build next?{' '}
          <a href={`mailto:${contactInfo.email.support}?subject=Build%20this%20next!`} target="_blank" rel="noreferrer">
            Let us know!
          </a>
        </Typography>
      </Grid>

      {/* Bottom drawer StoryBuilder form: https://mui.com/material-ui/react-drawer/#swipeable-edge */}
      <StoryBuilder.Drawer header={<StoryBuilder.Status loading={loading} storiesAvailable={storyPages.length > 0} />}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: { xs: '1.5rem', md: '40px' }
          }}
        >
          <Grid container maxWidth={800}>
            <Grid item xs={12} sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
              <Typography variant="h4" sx={{ textAlign: 'center', my: 2 }}>
                Hello {user?.name}!
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ textAlign: 'center', my: 2, color: '#808080' }}>
                Create amazing stories with just a few clicks! Simply select the options below and click &quot;Generate
                Story&quot; to get started.
              </Typography>
            </Grid>
            <StackableItem>
              <InputLabel id="hero-label">Hero&#39;s Name</InputLabel>
              <Select
                labelId="hero-label"
                value={hero}
                onChange={(e) => setHero(nullSafeStringOrValue(e.target.value))}
                label="Hero's Name"
              >
                {heroes.map((name, index) => (
                  <MenuItem key={index} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </StackableItem>
            <StackableItem>
              <InputLabel id="place-label">Place</InputLabel>
              <Select
                labelId="place-label"
                value={place}
                onChange={(e) => setPlace(nullSafeStringOrValue(e.target.value))}
              >
                {places.map((name, index) => (
                  <MenuItem key={index} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </StackableItem>
            <StackableItem>
              <InputLabel id="character-label">Secondary Character</InputLabel>
              <Select
                labelId="character-label"
                value={character}
                onChange={(e) => setCharacter(nullSafeStringOrValue(e.target.value))}
                label="Secondary Character"
              >
                {characters.map((name, index) => (
                  <MenuItem key={index} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </StackableItem>
            <StackableItem>
              <InputLabel id="object-label">Object</InputLabel>
              <Select
                labelId="object-label"
                value={object}
                onChange={(e) => setObject(nullSafeStringOrValue(e.target.value))}
                label="Object"
              >
                {objects.map((name, index) => (
                  <MenuItem key={index} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </StackableItem>
            <StackableItem>
              <InputLabel id="age-label">Age</InputLabel>
              <Select
                labelId="age-label"
                value={age}
                onChange={(e) => setAge(nullSafeStringOrValue(e.target.value))}
                label="Age"
              >
                {ages.map((name, index) => (
                  <MenuItem key={index} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </StackableItem>
            <StackableItem>
              <InputLabel id="subject-label">Subject</InputLabel>
              <Select
                labelId="subject-label"
                value={subject}
                onChange={(e) => setSubject(nullSafeStringOrValue(e.target.value))}
                label="Subject"
              >
                {subjects.map((name, index) => (
                  <MenuItem key={index} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </StackableItem>
            <Feature flag={FEATURE_FLAGS.STORY_BUILDER_SERVICE} offSwitch>
              <CenteredRowItem>
                <InputLabel id="writing-style-label">Writing Style</InputLabel>
                <Select
                  labelId="writing-style-label"
                  value={writingStyle}
                  onChange={(e) => setWritingStyle(nullSafeStringOrValue(e.target.value))}
                  label="Writing Style"
                >
                  {writingStyles.map((name, index) => (
                    <MenuItem key={index} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </CenteredRowItem>
            </Feature>
            <CenteredRowItem>
              <Button fullWidth variant="contained" onClick={generateStory} disabled={loading}>
                {loading ? <CircularProgress size={24} /> : 'Generate Story'}
              </Button>
            </CenteredRowItem>
          </Grid>
        </Box>
      </StoryBuilder.Drawer>
    </>
  )
}

export default withRoot(PagedStoryV1)
