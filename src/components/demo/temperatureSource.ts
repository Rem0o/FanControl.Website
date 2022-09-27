type TemperatureSource = {
  value: number;
  name: string;
};

function createTempSource(
  name: string,
  min: number,
  max: number
): TemperatureSource {
  let temperature = min;

  return {
    name: name,
    value: Math.round((Math.random() * (max - min)) + min),
  };
}

export type { TemperatureSource };

export default createTempSource;
