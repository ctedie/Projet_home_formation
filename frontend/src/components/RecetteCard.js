import React from 'react';

const CATEGORIE_LABELS = {
    entree: 'Entrée',
    plat: 'Plat',
    dessert: 'Dessert',
    boisson: 'Boisson',
};

const emojis = { entree: '🥗', plat: '🍲', dessert: '🍰', boisson: '🥤' };

function RecetteCard({ recette, onClick, isFavori, onToggleFavori }) {
    return (
        <div className="card recipe-card h-100" onClick={() => onClick(recette)}>
            <div className={`recipe-card__footer recipe-card__footer--${recette.categorie}`}>
                {CATEGORIE_LABELS[recette.categorie]}
            </div>
            <div className="recipe-card__img">
                {recette.photo ? (
                    <img src={recette.photo} alt={recette.nom} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                    <span>{emojis[recette.categorie] || '🍽'}</span>
                )}
            </div>
            <div className="card-body p-2 d-flex flex-column">
                <h6 className="recipe-card__title">{recette.nom}</h6>
                <p className="recipe-card__description">{recette.description}</p>
                <div className="mt-auto">
                    {onToggleFavori && (
                        <button
                            className={`favorite-btn ${isFavori ? 'active' : ''}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                onToggleFavori(recette.id);
                            }}
                            title={isFavori ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                        >
                            {isFavori ? '⭐' : '☆'}
                        </button>
                    )}        </div>
            </div>
        </div>
    );
}

export default RecetteCard;