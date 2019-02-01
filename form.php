
<?php ob_start(); ?>
<article class="col-lg-offset-2 col-lg-3">
  <table>
    <thead>
      <caption><h3>Station Sélectionnée :</h3></caption>
    </thead>
    <tbody>
      <tr>
        <td>
          <em>Statut :</em>
        </td>
        <td id="status"></td>
      </tr>
      <tr>
        <td>
          <em>Nom :</em>
        </td>
        <td id="name"> </td>
      </tr>
      <tr>
        <td>
          <em>Adresse :</em>
        </td>
        <td id="adress"></td>
      </tr>
      <tr>
        <td>
          <em>Capacité d'Accueil :</em>
        </td>
        <td id="capacity"></td>
      </tr>
      <tr>
       <td><em>Vélo Disponible :</em>
        </td>
        <td id="disponibility"></td>
      </tr>
      <tr>
        <td ><input type="button" value="Retour"/></td>
        <td><input type="button" value="Reserver"/></td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td>
          <label for="user_surname">
            <em>Nom : </em>
          </label>
          <input type="text" name="user_surname" id="user_surname"/>
        </td>
      </tr>
      <tr>
        <td>
          <label for="user_name">
            <em>Prénom : </em>
          </label>
          <input type="text" name="user_name" id="user_name"/>
        </td>
      </tr>
    </tfoot>
  </table>
</article>

<?php $form = ob_get_clean(); ?>
