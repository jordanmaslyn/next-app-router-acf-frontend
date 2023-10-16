import Image from 'next/image'

const links = [
  { name: 'Open roles', href: '#' },
  { name: 'Internship program', href: '#' },
  { name: 'Our values', href: '#' },
  { name: 'Meet our leadership', href: '#' },
]
const stats = [
  { name: 'Offices worldwide', value: '12' },
  { name: 'Full-time colleagues', value: '300+' },
  { name: 'Hours per week', value: '40' },
  { name: 'Paid time off', value: 'Unlimited' },
]

interface Props {
  background: {
    node: {
      sourceUrl: string
    }
  }
  title: string
  description: string
  pushers: Array<{
    label: string
    url: string
  }>
  stats: Array<{
    number: number
    label: string
  }>
}

export default function PageHeader({
  background,
  title,
  description,
  pushers,
  stats,
}: Props) {
  return (
    <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
      <Image
        src={background.node.sourceUrl}
        fill={true}
        alt=""
        className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
      />
      <div className="absolute inset-0 z-10 h-full w-full bg-slate-800 opacity-80" />
      <div className="relative z-20 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            {title}
          </h2>
          <p
            className="mt-6 text-lg leading-8 text-gray-300"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
        <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10">
            {pushers.map((pusher) => (
              <a key={pusher.label} href={pusher.url}>
                {pusher.label} <span aria-hidden="true">&rarr;</span>
              </a>
            ))}
          </div>
          {/* <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.name} className="flex flex-col-reverse">
                <dt className="text-base leading-7 text-gray-300">
                  {stat.name}
                </dt>
                <dd className="text-2xl font-bold leading-9 tracking-tight text-white">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl> */}
        </div>
      </div>
    </div>
  )
}
