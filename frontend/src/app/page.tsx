export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <h1 className="text-xl font-semibold text-gray-900">
            ReachInbox
          </h1>

          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-gray-200" />
            <span className="text-sm font-medium text-gray-700">
              User
            </span>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl">
        <aside className="min-h-[calc(100vh-4rem)] w-60 border-r bg-white p-4">
          <nav className="space-y-2">
            <button className="w-full rounded-lg bg-gray-100 px-4 py-2 text-left text-sm font-medium text-gray-900">
              Scheduled
            </button>

            <button className="w-full rounded-lg px-4 py-2 text-left text-sm text-gray-600 hover:bg-gray-100">
              Sent
            </button>

            <button className="mt-6 w-full rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800">
              + Compose New Email
            </button>
          </nav>
        </aside>

        <section className="flex-1 p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900">
              Scheduled Emails
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Manage your scheduled email campaigns.
            </p>
          </div>

          <div className="rounded-xl border bg-white">
            <div className="grid grid-cols-5 border-b px-6 py-4 text-sm font-medium text-gray-500">
              <span>Recipient</span>
              <span>Subject</span>
              <span>Scheduled Time</span>
              <span>Status</span>
              <span>Actions</span>
            </div>

            <div className="flex min-h-64 items-center justify-center px-6">
              <div className="text-center">
                <p className="text-sm font-medium text-gray-900">
                  No scheduled emails
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Create a campaign to schedule your first email.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}