export default function ComposePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center px-6">
          <h1 className="text-xl font-semibold text-gray-900">
            ReachInbox
          </h1>
        </div>
      </header>

      <section className="mx-auto max-w-3xl px-6 py-10">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">
            Compose New Email
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Create and schedule an email campaign.
          </p>
        </div>

        <div className="rounded-xl border bg-white p-6">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="recipients"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Recipients
              </label>

              <textarea
                id="recipients"
                placeholder="Enter email addresses, one per line"
                className="min-h-32 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2"
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Subject
              </label>

              <input
                id="subject"
                type="text"
                placeholder="Enter email subject"
                className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2"
              />
            </div>

            <div>
              <label
                htmlFor="body"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Email Body
              </label>

              <textarea
                id="body"
                placeholder="Write your email..."
                className="min-h-48 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2"
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="startTime"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Start Time
                </label>

                <input
                  id="startTime"
                  type="datetime-local"
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="delay"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Delay Between Emails
                </label>

                <input
                  id="delay"
                  type="number"
                  min="0"
                  placeholder="2000"
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="hourlyLimit"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Hourly Email Limit
              </label>

              <input
                id="hourlyLimit"
                type="number"
                min="1"
                placeholder="50"
                className="w-full rounded-lg border px-3 py-2 text-sm"
              />
            </div>

            <div className="flex justify-end gap-3 border-t pt-6">
              <button
                type="button"
                className="rounded-lg border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="button"
                className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
              >
                Schedule Campaign
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}