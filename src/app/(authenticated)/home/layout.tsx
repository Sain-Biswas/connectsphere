import getCurrentUser from "@/resources/actions/getCurrentUser";


const Layout = async ({ children }: { children: React.ReactNode }) => {
    const currentUser = await getCurrentUser();

    return (
        <div className="w-full flex flex-col md:flex-row">
            <div className="md:w-3/4 w-full">
                {children}
            </div>
            <div className="hidden border-l-[1px] md:block w-1/4">
                Right Side Bar
            </div>
        </div>
    )
}

export default Layout