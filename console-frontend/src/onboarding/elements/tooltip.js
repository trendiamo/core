import Button from './button'
import React, { useCallback, useEffect, useMemo } from 'react'
import SharedButton from 'shared/button'
import styled from 'styled-components'
import { Body, Header, SmallHeader } from './typography'
import { changeStage } from 'onboarding/scenario-actions'
import { showUpToUsBranding } from 'utils'
import { useHistory } from 'react-router-dom'
import { useOnboardingConsumer } from 'ext/hooks/use-onboarding'

const Container = styled.div`
  min-width: 300px;
  margin: ${showUpToUsBranding() ? '0 4px 20px' : '20px'};
  text-align: ${({ align }) => align};
  max-width: 570px;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`

const StopTourButton = styled(SharedButton)`
  padding: 3px 15px;
`

const Tooltip = ({
  align,
  body,
  toStage1,
  create,
  title,
  smallHeader,
  nextRoute,
  index,
  primaryProps,
  onboarding,
  isFinalStep,
}) => {
  const history = useHistory()

  useEffect(() => toStage1 && changeStage(1), [toStage1])
  const { setOnboarding } = useOnboardingConsumer()

  const onNextClick = useCallback(() => {
    history.push(nextRoute)
    setOnboarding({ ...onboarding, stepIndex: onboarding.stepIndex + 1 })
  }, [history, nextRoute, onboarding, setOnboarding])

  const onFinishTourClick = useCallback(() => {
    setOnboarding({ ...onboarding, run: false, help: { ...onboarding.help, run: false } })
    changeStage(1)
  }, [onboarding, setOnboarding])

  const isSingle = useMemo(() => onboarding.help.run && onboarding.help.single, [onboarding])

  return (
    <Container align={align || 'left'}>
      {!showUpToUsBranding() && <SmallHeader variant="overline">{smallHeader || `Step ${index + 1}`}</SmallHeader>}
      <Header variant="h3">{title}</Header>
      {typeof body === 'string' ? <Body variant="body2">{body}</Body> : body}
      {showUpToUsBranding() ? (
        <ButtonContainer>
          {!isSingle && !isFinalStep && (
            <StopTourButton color="onboardingWhite" inline onClick={onFinishTourClick} size="small">
              {'Stop Tour'}
            </StopTourButton>
          )}
          <SharedButton
            color="primaryGradient"
            inline
            onClick={!isSingle && nextRoute ? onNextClick : onFinishTourClick}
            size="small"
          >
            {isSingle ? 'Ok' : nextRoute ? 'Next' : 'Finish Tour'}
          </SharedButton>
        </ButtonContainer>
      ) : (
        <Button
          buttonConfig={primaryProps}
          create={create}
          history={history}
          nextRoute={nextRoute}
          onboarding={onboarding}
        />
      )}
    </Container>
  )
}

export default Tooltip
