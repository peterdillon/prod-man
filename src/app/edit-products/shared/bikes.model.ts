export interface Bikes {
    id: string;
    name: string;
    description: string;
    rating: number;
    price: number;
    quantity: number;
    type: string;
    image: string;
    logo: string;
}

export interface ConfirmDialogData {
    title: string;
    message: string;
    confirmCaption: string;
    cancelCaption?: string;
    hasCancelButton: boolean;
  }