export default function Event({
    params,
  }: {
    params: { event : string }
  }) {
    console.log(params['event'])
    return (
    <h1>
        {params['event']}
    </h1>
    )
  }