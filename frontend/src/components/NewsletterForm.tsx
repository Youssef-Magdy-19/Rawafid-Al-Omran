import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Input } from '@components/ui';
import { Send } from 'lucide-react';
import { apiClient } from '@services/api/client';

export interface NewsletterFormProps {}

export function NewsletterForm(_props?: NewsletterFormProps) {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    try {
      await apiClient.post('/newsletter', { email });
      setEmail('');
    } catch (err) {
      console.error('Failed to subscribe:', err);
      setError(t('newsletter.error'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md gap-3">
      <Input
        type="email"
        placeholder={t('newsletter.placeholder')}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1"
        required
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
      <Button type="submit" isLoading={isLoading} leftIcon={<Send className="h-4 w-4" />}>
        {t('newsletter.subscribe')}
      </Button>
    </form>
  );
}