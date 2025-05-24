import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

export default function CodeEditor() {
  return (
    <Card className="bg-background shadow-lg border-muted w-full max-w-3xl">
      <CardHeader>
        <CardTitle className="font-semibold text-lg">Éditeur de code</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Textarea
          className="min-h-[200px] font-mono text-sm resize-y"
          placeholder="Écrivez ou collez votre code ici..."
        />
        <div className="flex justify-end gap-2">
          <Button variant="outline">Annuler</Button>
          <Button>Enregistrer</Button>
        </div>
      </CardContent>
    </Card>
  );
} 