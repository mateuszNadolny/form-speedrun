import ChangePasswordFormWrapper from '@/components/settings/change-password-form-wrapper';
import DeleteAccountWrapper from '@/components/settings/delete-account-wrapper';

const SettingsPage = () => {
  return (
    <section className="flex flex-col w-full gap-8 h-screen max-h-screen overflow-y-scroll py-20 px-5 lg:pt-26 lg:px-20 overflow-y-auto">
      <ChangePasswordFormWrapper />
      <DeleteAccountWrapper />
    </section>
  );
};

export default SettingsPage;
