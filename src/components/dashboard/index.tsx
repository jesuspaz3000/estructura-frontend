interface DaDashboardContainerProps {
  children?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  rightBar?: React.ReactNode;
  leftBar?: React.ReactNode;
}

const DaDashboardContainer = ({header, leftBar, rightBar, children, footer} : DaDashboardContainerProps) => {
  return (
    <div>
      <header className="tw-w-full tw-h-[82px]">
        {header}
      </header>
      <div className="tw-w-full tw-flex tw-h-[calc(100vh-82px)]">
        <aside className="tw-w-[150px] tw-bg-red-200">
          {leftBar}
        </aside>
        <div className=" tw-relative tw-grow tw-overflow-y-scroll">
          <main className="tw-h-[120vh]">
            {children}
          </main>
          <div className="tw-bottom-0 tw-w-full tw-h-[50px] tw-bg-blue-200">
            {footer}
          </div>
        </div>
        <aside className="tw-w-[150px] tw-bg-red-200">
          {rightBar}
        </aside>
      </div>
    </div>
  )
}

export default DaDashboardContainer;