import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";

export default function Blank() {
  return (
    <div>
      <PageMeta
        title="React.js Blank Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Blank Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Masters" />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <div className="max-h-[600px] w-full text-center">
          {/* <h3 className="mb-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">
            Card Title Here
          </h3> */}

          <div className="px-5 mb-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              
              {/* Sales Person Card */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition dark:border-gray-800 dark:bg-white/[0.03]">
                <div className="flex flex-col items-center text-center space-y-3">
                  <a href="salesperson" className="flex flex-col items-center space-y-2 text-gray-800 dark:text-white/90 hover:text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path>
                      <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      <path d="M21 21v-2a4 4 0 0 0 -3 -3.85"></path>
                    </svg>
                    <span className="font-semibold text-base">Sales Person</span>
                  </a>
                </div>
              </div>

              {/* Client Card */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition dark:border-gray-800 dark:bg-white/[0.03]">
                <div className="flex flex-col items-center text-center space-y-3">
                  <a href="client" className="flex flex-col items-center space-y-2 text-gray-800 dark:text-white/90 hover:text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M12 3l8 4.5v9l-8 4.5l-8 -4.5v-9z"></path>
                      <path d="M12 12l8 -4.5"></path>
                      <path d="M12 12v9"></path>
                      <path d="M12 12l-8 -4.5"></path>
                    </svg>
                    <span className="font-semibold text-base">Client</span>
                  </a>
                </div>
              </div>

              {/* Creator Card */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition dark:border-gray-800 dark:bg-white/[0.03]">
                <div className="flex flex-col items-center text-center space-y-3">
                  <a href="creator" className="flex flex-col items-center space-y-2 text-gray-800 dark:text-white/90 hover:text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M10 3.2a9 9 0 1 0 10.8 10.8a1 1 0 0 0 -1 -1h-6.8a2 2 0 0 1 -2 -2v-7a.9 .9 0 0 0 -1 -.8"></path>
                      <path d="M15 3.5a9 9 0 0 1 5.5 5.5h-4.5a1 1 0 0 1 -1 -1v-4.5"></path>
                    </svg>
                    <span className="font-semibold text-base">Creator</span>
                  </a>
                </div>
              </div>

              {/* SMM Card */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition dark:border-gray-800 dark:bg-white/[0.03]">
                <div className="flex flex-col items-center text-center space-y-3">
                  <a href="smm" className="flex flex-col items-center space-y-2 text-gray-800 dark:text-white/90 hover:text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M12 3l8 4.5v9l-8 4.5l-8 -4.5v-9z"></path>
                      <path d="M12 12l8 -4.5"></path>
                      <path d="M12 12v9"></path>
                      <path d="M12 12l-8 -4.5"></path>
                    </svg>
                    <span className="font-semibold text-base">SMM</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
