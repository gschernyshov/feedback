import { FeedbackCreateForm } from '@/widgets/feedback-create'
import { FeedbackManager } from '@/widgets/feedback-manager'
import { FeedbackList } from '@/widgets/feedback-list'
import { ToastContainer } from '@/features/notifications'

export const HomePage = () => (
  <main className="flex justify-center items-start gap-7 m-5">
    <div className="flex flex-col gap-7 w-full max-w-xl">
      <FeedbackCreateForm />
      <FeedbackManager />
    </div>
    <FeedbackList />

    <ToastContainer />
  </main>
)
