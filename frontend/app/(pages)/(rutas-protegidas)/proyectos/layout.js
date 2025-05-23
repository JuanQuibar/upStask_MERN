"use client"
import useAuth from '@/app/hooks/useAuth';
import { redirect } from 'next/navigation';
// redirect es del lado del servidor, mientras que useRouter (push o replace) es del lado del cliente
import { ProyectosProvider } from '@/app/context/ProyectosProvider';
import Header from '@/app/components/Header';
import Sidebar from '@/app/components/Sidebar';

export default function Layout({ children }) {

    const { auth, cargando} = useAuth();

    if(cargando) return 'Cargando...'

    return(
        <>
            { auth._id ? 
            (
                <div className='bg-gray-200'>

                    <Header/>

                    <div className='md:flex md:min-h-screen'>

                        <div className='flex-col'>
                
                            <Sidebar
                            nombre={auth.nombre}
                            />

                        </div>

                        <main className='p-10 flex-1'>
                            <ProyectosProvider>
                                {children} 
                            </ProyectosProvider>

                        </main>

                    </div>

                </div>

            ) : redirect('/') }

        </>
    );

};