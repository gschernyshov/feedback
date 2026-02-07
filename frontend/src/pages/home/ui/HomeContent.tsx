import { CreateFeedbackForm } from '@/src/widgets/create-feedback'
import { FeedbackList } from '@/src/widgets/feedback-list'

export const HomePage = () => (
  <main className="m-5 flex justify-center gap-7">
    <CreateFeedbackForm />
    <FeedbackList />
  </main>
)
