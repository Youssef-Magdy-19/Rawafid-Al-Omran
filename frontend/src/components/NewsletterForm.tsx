import { useState } from 'react';
import { Button, Input } from '@components/ui';
import { Send } from 'lucide-react';

export interface NewsletterFormProps {
  onSubmit?: (_email: string) => void;
}

export function NewsletterForm({ onSubmit }: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      await onSubmit?.(email);
      setEmail('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md gap-3">
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1"
        required
      />
      <Button type="submit" isLoading={isLoading} leftIcon={<Send className="h-4 w-4" />}>
        Subscribe
      </Button>
    </form>
  );
}