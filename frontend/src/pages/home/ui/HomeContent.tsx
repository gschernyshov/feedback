import { FeedbackCreateForm } from '@/widgets/feedback-create'
import { FeedbackList } from '@/widgets/feedback-list'
import { FeedbackManager } from '@/widgets/feedback-manager'

export const HomePage = () => (
  <main className="flex justify-center items-start gap-7 m-5">
    <div className="flex flex-col gap-7 w-full max-w-xl">
      <FeedbackCreateForm />
      <FeedbackManager />
    </div>
    <FeedbackList />
  </main>
)
