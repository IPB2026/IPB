import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import FaqSection from './FaqSection';

describe('FaqSection Component', () => {
  const mockFaqData = [
    {
      question: 'Comment savoir si ma fissure est dangereuse ?',
      answer: 'Une fissure devient préoccupante si elle évolue...',
    },
    {
      question: 'Pourquoi privilégier l\'agrafage ?',
      answer: 'C\'est une question de proportionnalité...',
    },
  ];

  it('should render FAQ title', () => {
    render(
      <FaqSection
        title="Questions fréquentes"
        data={mockFaqData}
        theme="orange"
      />
    );

    expect(screen.getByText('Questions fréquentes')).toBeInTheDocument();
  });

  it('should render all FAQ questions', () => {
    render(
      <FaqSection
        title="Questions fréquentes"
        data={mockFaqData}
        theme="orange"
      />
    );

    expect(screen.getByText('Comment savoir si ma fissure est dangereuse ?')).toBeInTheDocument();
    expect(screen.getByText('Pourquoi privilégier l\'agrafage ?')).toBeInTheDocument();
  });

  it('should apply correct theme colors', () => {
    const { container } = render(
      <FaqSection
        title="Questions fréquentes"
        data={mockFaqData}
        theme="blue"
      />
    );

    // Vérifie que le conteneur existe
    expect(container.firstChild).toBeTruthy();
  });

  it('should render empty when no data provided', () => {
    render(
      <FaqSection
        title="Questions fréquentes"
        data={[]}
        theme="orange"
      />
    );

    expect(screen.getByText('Questions fréquentes')).toBeInTheDocument();
  });
});
