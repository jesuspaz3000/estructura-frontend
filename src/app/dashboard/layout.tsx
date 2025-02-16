import DaDashboardContainer from "@da-shui/components/dashboard";
import Header from "@da-shui/components/dashboard/header"

const Layout = ({
  children
} : Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <DaDashboardContainer
      header={<Header />}
    >
      {children}
    </DaDashboardContainer>

  )
}

export default Layout