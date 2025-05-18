import { LucideLoaderCircle } from "lucide-react";

export default async function LoadingPage() {
    return (
        <div className='flex flex-col items-center justify-center min-h-screen '>
            <LucideLoaderCircle className="animate-spin" width={60} height={60}/>
        </div>
    )
}