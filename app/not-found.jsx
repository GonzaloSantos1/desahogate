import ErrorComponent from './components/ErrorComponent';

export default function NotFound() {
  return (
    <ErrorComponent
      size={350}
      text={'¡Vaya! Parece que aquí no hay nada que ver'}
      textSize={'3xl'}
    />
  );
}
