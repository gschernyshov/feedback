'use client'

import { FeedbackForm } from "@/src/features/feedback/ui/FeedbackForm";
import { Provider } from "react-redux";
import { store } from "./store";

export default function Home() {
  return (
    <Provider store={store}>
      <FeedbackForm />
    </Provider>
  );
}
