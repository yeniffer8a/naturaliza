import { Clock, Droplet, Scale } from "lucide-react";

interface PreparationInstructionsProps {
  portion: string;
  temperature: string;
  time: string;
  intensificationNote?: string;
}

export function PreparationInstructions({
  portion,
  temperature,
  time,
  intensificationNote,
}: PreparationInstructionsProps) {
  return;
  <div className="space-y-6">
    <h2 className="text-xl font-semibold">Instrucciones de preparación</h2>

    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Scale className="h-5 w-5 text-gray-600" />
        <div>
          <span className="font-medium">Porción recomendada:</span>
          <span className="ml-2">{portion}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Droplet className="h-5 w-5 text-gray-600" />
        <div>
          <span className="font-medium">Temperatura del agua:</span>
          <span className="ml-2">{temperature}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Clock className="h-5 w-5 text-gray-600" />
        <div>
          <span className="font-medium">Tiempo de infusión:</span>
          <span className="ml-2">{time}</span>
        </div>
      </div>
      {intensificationNote && (
        <p className="text-sm text-gray-600 mt-2">{intensificationNote}</p>
      )}
    </div>
  </div>;
}
