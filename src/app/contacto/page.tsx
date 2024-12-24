import { ClientComponet } from '@/components/client-component/client-component';
import styles from '../common.module.css';
import Link from 'next/link';

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export default async function UsersPage() {
  const res = await fetch('https://reqres.in/api/users?page=1', {
    next: { tags: ['all'] },
  });

  if (!res.ok) {
    return <div>Error fetching users</div>;
  }

  const data = await res.json();

  return (
    <>
      <div className={styles.wrapper}>
        <Link href='/'>Home</Link>
        <h1 className={styles.h1}>Contacto</h1>
        <h2 className={styles.h2}>Otros Usuarios</h2>
        <ul className={styles.ul}>
          {data.data.map((user: User) => (
            <li key={user?.id}>
              {user?.first_name} {user?.last_name} - {user?.email}
            </li>
          ))}
        </ul>
        <ClientComponet />
      </div>
    </>
  );
}
