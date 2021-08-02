
export default function Home() {
  return (
    <></>
  )
}

export async function getServerSideProps(context) {

    return {
        redirect: {
            destination: '/cards',
            permanent: false,
        }
    }
}