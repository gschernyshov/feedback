import { CreateFeedbackForm } from '@/widgets/create-feedback'
import { FeedbackList } from '@/widgets/feedback-list'

export const HomePage = () => (
  <main className="flex justify-center gap-7 m-5">
    <CreateFeedbackForm />
    <FeedbackList />
  </main>
)
