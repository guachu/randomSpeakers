package edu.eci.arsw.randomSpeakers.randomSpeakers.model;





public class User{
    
    //Atributos

    String  nombre;
    String  mail;
    String contrasenia;



    public User(String nombre, String contrasenia){
        this.nombre = nombre;
        this.contrasenia = contrasenia;
    }


    /**
     * @return the nombre
     */
    public String getNombre() {
        return nombre;
    }

    /**
     * @param nombre the nombre to set
     */
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    /**
     * @return the constrasenia
     */
    public String getContrasenia() {
        return contrasenia;
    }

    /**
     * @param constrasenia the constrasenia to set
     */
    public void setContrasenia(String constrasenia) {
        this.contrasenia = constrasenia;
    }

    /**
     * @return email
     */
    public String getMail() {
        return mail;
    }

    /**
     * @param mail the mail to set
     */
    public void setMail(String mail) {
        this.mail = mail;
    }


    public String toString(){
        return nombre + " " +contrasenia + " " + mail;
    }

}