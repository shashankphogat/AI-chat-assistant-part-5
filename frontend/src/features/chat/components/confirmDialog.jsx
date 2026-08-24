import React from "react";

const ConfirmDialog = ({
    title,
    message,
    confirmText = "Confirm",
    onConfirm,
    onCancel
}) => {
    return (
        <div className="dialog_overlay">
            <div className="dialog">
                <h2>{title}</h2>

                <p>{message}</p>

                <div className="dialog_buttons">
                    <button onClick={onCancel}>
                        Cancel
                    </button>

                    <button onClick={onConfirm}>
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;