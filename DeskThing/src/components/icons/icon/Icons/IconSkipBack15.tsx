import { Icon, findClosestGlyphAvailable } from '..'

function IconSkipBack15(props: any): JSX.Element {
  const strokeWidth = props.strokeWidth || 0

  const iconList = [{
    'size': 16,
    'svgContent': '<path d=\'M2.464 4.5h1.473a.75.75 0 110 1.5H0V2.063a.75.75 0 011.5 0v1.27a8.25 8.25 0 1110.539 12.554.75.75 0 01-.828-1.25A6.75 6.75 0 102.464 4.5z\'/><path d=\'M.303 8.407c.79 0 1.214-.52 1.214-.907h1.5v8h-1.5V9.907H0v-1.5h.303zm4.832-.911h4.05v1.5H6.33l-.245 1.067c.256-.071.525-.11.804-.11 1.621 0 2.954 1.3 2.954 2.924C9.843 14.5 8.51 15.8 6.89 15.8a2.945 2.945 0 01-2.93-2.54l1.487-.197c.092.69.696 1.237 1.443 1.237.813 0 1.454-.647 1.454-1.423s-.64-1.423-1.454-1.423c-.49 0-.92.235-1.183.594l-.01.014-.206.254-1.314-.639.96-4.181z\'/>'
  }, {
    'size': 24,
    'svgContent': '<path d=\'M5.286 6H7.25a1 1 0 110 2H2V2.75a1 1 0 112 0v1.694A10.97 10.97 0 0111.994 1c6.075 0 11 4.925 11 11a10.99 10.99 0 01-4.943 9.183 1 1 0 11-1.102-1.668A9 9 0 105.286 6zm-3.917 7.518c1.005 0 1.591-.666 1.591-1.217h1.6v9.74h-1.6v-6.923H1v-1.6h.369z\'/><path d=\'M7.343 12.41h4.84v1.6H8.616l-.362 1.578a3.53 3.53 0 011.132-.186c1.914 0 3.484 1.532 3.484 3.446 0 1.914-1.57 3.446-3.484 3.446-1.76 0-3.229-1.296-3.454-2.995l1.586-.21c.119.896.903 1.605 1.868 1.605 1.052 0 1.884-.838 1.884-1.846 0-1.009-.832-1.846-1.884-1.846-.632 0-1.19.304-1.53.77l-.012.015-.248.307-1.402-.681 1.148-5.004z\'/>'
  }];

  const closestSize = findClosestGlyphAvailable(iconList, props.iconSize || 24);

  const svgContent = `
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round">${closestSize.svgContent}</svg>
  `

  return <Icon {...props} dangerouslySetInnerHTML={{ __html: svgContent }} />
}

export default IconSkipBack15
