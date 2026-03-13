import { Stepper, StepperItem } from "@/registry/stepper/stepper"

export default async function Preview() {
  return (
    <Stepper>
      <StepperItem title="Install" status="completed" />
      <StepperItem title="Configure" status="active" />
      <StepperItem title="Deploy" />
    </Stepper>
  )
}
