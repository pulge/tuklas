import React from 'react';
import { IntegrationsClient } from '@/components/integrations/IntegrationsClient';
import { getIntegration } from '@/app/actions/integration-actions';
import { profileRepository } from '@/lib/db/sqlite/profile';

export default async function IntegrationsPage() {

  const integrations = {
    rapidapi: await getIntegration('rapidapi', true),
    gmail: await getIntegration('gmail', true),
    gemini: await getIntegration('gemini', true),
    openrouter: await getIntegration('openrouter', true),
  };

  const profile = await profileRepository.get();

  return (
    <div className="h-full bg-admin-bg">
      <IntegrationsClient 
        initialIntegrations={integrations} 
        initialPreferences={profile?.preferences ? JSON.parse(profile.preferences) : {}}
      />
    </div>
  );
}
