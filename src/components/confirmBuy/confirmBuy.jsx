import { useContext } from "react";
import { CartContext } from "../../context/cartContext";
import { useForm } from "react-hook-form";
import { Button } from "react-bootstrap";
import './style-confirmBuy.css';

export const ConfirmBuy = () => {
    const { cart, cleanCart, totalPriceCart, send, setSend } = useContext(CartContext);
    const { register, formState: { errors }, handleSubmit } = useForm();

    const onSubmit = handleSubmit((data) => {
        let dataBuy = {
            user: {
                name: data.name,
                adress: data.adress,
                specification: data.specification
            }
        };

        const phoneNumber = "5493424068755";
        const message = `
        *🛒 Hola! Quiero estos productos, ¿cómo seguimos?*
        
        📌 *Nombre:* ${dataBuy.user.name}
        📍 *Dirección:* ${dataBuy.user.adress}
        📝 *Especificaciones:* ${dataBuy.user.specification}
        
        🧾 *Productos:*
        ${cart.map((p) => `- *${p.title || "-"}*
            Código: *${p.code}*
          ↪️ *Especificaciones:* ${p.detail}
          📦 *Cantidad:* ${p.quantity} unidades
          ───────────────────────────────\n`).join('')}
        
        💰 *Envío y Total:*
        🚚 *Envío:* $${send}.-
        💵 *Precio estimativo total:* $${totalPriceCart.toFixed(2)}.-
        `.trim();
        const messageEncoded = encodeURIComponent(message);
        const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${messageEncoded}`;


        navigator.clipboard.writeText(message)

        window.open(whatsappURL, "_blank");


        setSend(0);
        cleanCart();
    });

    return (
        <div>
            <h1 className="m-3 text-center fw-bold">FINALIZAR COMPRA</h1>
            <div className="d-flex flex-column align-items-center mb-5 pb-3">
                <div className="alert alert-warning">El carrito se copiara en tu portapapeles ante cualquier eventualidad. <br /> Muchas gracias!</div>
                <form onSubmit={handleSubmit(onSubmit)} className="w-50">
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Nombre completo: </label>
                        <input placeholder="Ingrese Nombre Completo" className="form-control" type="text" id="name" {...register("name", { required: true })} />
                        {errors.name?.type === "required" && <div className="alert alert-danger mt-2">El nombre es OBLIGATORIO</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="adress" className="form-label">Dirección: </label>
                        <input placeholder="Ingrese dirección" className="form-control" type="text" id="adress" {...register("adress", { required: true })} />
                        {errors.adress?.type === "required" && <div className="alert alert-danger mt-2">La dirección es OBLIGATORIA</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="specification" className="form-label">Especificaciones de domicilio: </label>
                        <input placeholder="Ingrese especificaciones" className="form-control" type="text" id="specification" {...register("specification", { required: true })} />
                        {errors.specification?.type === "required" && <div className="alert alert-warning mt-2">Ingrese especificaciones del Domicilio</div>}
                    </div>

                    <Button type="submit" className="w-100 fw-bold">FINALIZAR COMPRA</Button>
                </form>
            </div>
        </div>
    );
};