import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

const lines = [];
const listeners = new Set();
function log(line) {
  lines.push(line);
  listeners.forEach((listener) => listener());
}

const worker = new SharedWorker(new URL('./worker.js', import.meta.url), { name: 'repro' });

log(`new SharedWorker(...) returned: ${Object.prototype.toString.call(worker)}`);
log(`worker.port: ${worker.port}`);

if (worker.port) {
  worker.port.onmessage = (event) => log(`worker says: ${event.data}`);
  worker.port.start();
} else {
  worker.onmessage = (event) => log(`worker says: ${event.data}`);
}

export default function App() {
  const [, update] = useState(0);
  useEffect(() => {
    const listener = () => update((n) => n + 1);
    listeners.add(listener);
    listener();
    return () => listeners.delete(listener);
  }, []);

  return (
    <View style={{ padding: 24 }}>
      {lines.map((line, index) => (
        <Text key={index} testID="line">
          {line}
        </Text>
      ))}
    </View>
  );
}
