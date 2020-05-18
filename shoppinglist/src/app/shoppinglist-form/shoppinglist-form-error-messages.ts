export class ErrorMessage {
    constructor(
        public forControl: string,
        public forValidator: string,
        public text: string
    ) { }
}

export const ShoppinglistFormErrorMessages = [
    new ErrorMessage ('title', 'required', 'Ein Titel muss angegeben werden'),
    new ErrorMessage('dueDate', 'required', 'Ein Fälligkeitsdatum muss angegeben werden.'),
    new ErrorMessage('description', 'required', 'Eine Warenbezeichnung muss angegeben werden.'),
    new ErrorMessage('quantity', 'min', 'Die Menge kann nur Werte über 0 haben.'),
    new ErrorMessage('max_price', 'min', 'Der maximale Preis muss über 0 liegen.'),
];
