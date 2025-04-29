import RequestDetails from "./request-details"

export default function RequestDetailsPage({ params }: { params: { id: string } }) {
  return <RequestDetails requestId={params.id} />
}
