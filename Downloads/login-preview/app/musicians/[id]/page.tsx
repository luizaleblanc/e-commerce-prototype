import MusicianDetails from "./musician-details"

export default function MusicianDetailsPage({ params }: { params: { id: string } }) {
  return <MusicianDetails musicianId={params.id} />
}
