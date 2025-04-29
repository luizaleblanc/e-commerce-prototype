import UserDetails from "./user-details"

export default function UserDetailsPage({ params }: { params: { id: string } }) {
  return <UserDetails userId={params.id} />
}
