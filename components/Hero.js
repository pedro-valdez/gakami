import FancyGakami from './FancyGakami'


export default function Hero() {
  return (
    <div className="hero h-full" style={{ backgroundImage: 'url(/japan.svg)' }}>
      <div className="hero-content">
        <h1 className="text-7xl text-white"><FancyGakami /></h1>
      </div>
    </div>
  )
}
