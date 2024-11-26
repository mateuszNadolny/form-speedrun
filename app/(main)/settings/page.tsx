import DeleteAccountWrapper from '@/components/settings/delete-account-wrapper';

const SettingsPage = () => {
  return (
    <section className="flex flex-col w-full items-center gap-8 h-screen max-h-screen py-20 px-5 lg:pt-26 lg:px-20 overflow-y-auto">
      <h1 className="text-xl lg:text-4xl font-bold text-color-light text-center font-semibold font-heading">
        Settings
      </h1>
      <DeleteAccountWrapper />
    </section>
  );
};

export default SettingsPage;
