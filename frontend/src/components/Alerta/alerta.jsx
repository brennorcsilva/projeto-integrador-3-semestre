import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

const Alerta = ({titulo, texto, style, handleSubmit}) =>{

    return(
        <AlertDialog defaultOpen={true}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className={`${style}`}>{titulo}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {texto}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction className="cursor-pointer bg-(--cor-fundo) hover:opacity-75 hover:bg-(--cor-fundo)" onClick={handleSubmit}>Continuar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default Alerta;