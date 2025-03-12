
const recargar = () => {
    window.location.reload();
};

export const Error = (error) => {
    return (
        <div className="alert alert-danger text-center">
            {error}
            <br />
            <button className="btn btn-primary mt-2" onClick={recargar}>
                Recargar Página
            </button>
        </div>
    )
}