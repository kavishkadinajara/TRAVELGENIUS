import NavBar from "@/components/NavBar";


export default function AccountLayout({ children }) {
    return (

        <div className="text-slate-200 min-h-screen">
            <NavBar />
            {children}
        </div>
    );
}