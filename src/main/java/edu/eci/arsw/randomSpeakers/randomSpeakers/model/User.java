package edu.eci.arsw.randomSpeakers.randomSpeakers.model;





public class User{
    
    //Atributos

    String  nombre;
    String constrasenia;



    public User(){
        
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
    public String getConstrasenia() {
        return constrasenia;
    }

    /**
     * @param constrasenia the constrasenia to set
     */
    public void setConstrasenia(String constrasenia) {
        this.constrasenia = constrasenia;
    }



}