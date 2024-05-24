interface CarouselData {
    title: string;
    description: string;
    icon: string;
    iconAlt: string;
}

export const carouselData: CarouselData[] = [
  {
    title: 'Live Tracking of Assets',
    description:
      'Continuous asset surveillance, ensuring constant oversight for enhanced security.',
    icon: '/assets/icons/fa-solid_route.svg',
    iconAlt: 'Location Icon',
  },
  {
    title: 'Continuous Asset Surveillance',
    description:
      'Our system provides continuous asset surveillance, ensuring constant oversight for enhanced security',
    icon: '/assets/icons/fa-solid_surveillance.svg',
    iconAlt: 'Surveillance Icon',
  },
  {
    title: 'Efficient Fleet Care, Reliable Fleet Operations',
    description:
      'Real-time insights into the status and performance of mining assets allow for proactive management, ensuring optimal efficiency and minimizing downtime for unparalled productivity.',
    icon: '/assets/icons/fa-solid_operations.svg',
    iconAlt: 'Operations Icon',
  },
];