export default function Contact() {
  return (
    <section className="contactPage">

      <h1 className="contactTitle">
        Contact
      </h1>

      <p className="contactDescription">
        Vous avez une question ? Contactez-nous.
      </p>

      <div className="contactContent">

        <div className="contactInformations">

          <h2>Informations</h2>

          <p>
            <strong>Adresse :</strong>
            <br />
            123, rue du Collège
          </p>

          <p>
            <strong>Téléphone :</strong>
            <br />
            418-555-1234
          </p>

          <p>
            <strong>Courriel :</strong>
            <br />
            info@collegelapocatiere.ca
          </p>

        </div>

        <form className="contactForm">

          <label htmlFor="nom">
            Nom
          </label>

          <input
            type="text"
            id="nom"
            placeholder="Votre nom"
          />

          <label htmlFor="email">
            Courriel
          </label>

          <input
            type="email"
            id="email"
            placeholder="Votre courriel"
          />

          <label htmlFor="message">
            Message
          </label>

          <textarea
            id="message"
            rows={5}
            placeholder="Votre message"
          />

          <button type="submit">
            Envoyer
          </button>

        </form>

      </div>

    </section>
  );
}