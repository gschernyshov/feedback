'use client';

import { ChangeEvent, useState } from 'react';
import { useSendFeedbackMutation } from '@/src/shared/api/feedbackApi';

export function FeedbackForm() {
  const [sendFeedback, { isLoading, isSuccess, isError }] = useSendFeedbackMutation();

  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  }

  const handleSubmit = async () => {
    const result = await sendFeedback(form);

    if ('data' in result) {
      setForm({
        name: '',
        email: '',
        message: '',
      });
    } else {
      if ('data' in result.error) {
        console.log(result.error.data);
      }
    }
  };

  return (
    <div 
      className="w-full flex justify-center"
    >
      <div 
        className="flex flex-col justify-start gap-2 w-xl p-3"
      >
        {isSuccess && 
          <p className="text-green-500">Feedback отправлен!</p>}
        {isError && 
          <p className="text-red-500">При отправки Feedback возникла ошибка!</p>}
    
        <input 
          className="p-2 border border-black cursor-pointer"
          name="name" 
          placeholder="Имя" 
          onChange={handleChange} 
        />
        <input 
          className="p-2 border border-black cursor-pointer"
          name="email" 
          placeholder="Email" 
          onChange={handleChange} 
        />
        <textarea 
          className="p-2 border border-black cursor-pointer"
          name="message" 
          placeholder="Сообщение" 
          onChange={handleChange} 
        />

        <button 
          className="p-3 border border-black cursor-pointer"
          onClick={handleSubmit} 
          disabled={isLoading}>
            {!isLoading ? 'Отправить' : 'Отправка'}
        </button>
      </div>
    </div>
  );
}