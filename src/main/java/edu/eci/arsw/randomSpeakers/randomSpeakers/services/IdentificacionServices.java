package edu.eci.arsw.randomSpeakers.randomSpeakers.services;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;

import com.fasterxml.jackson.databind.node.BooleanNode;

import org.springframework.stereotype.Service;

import edu.eci.arsw.randomSpeakers.randomSpeakers.model.User;


@Service
public class IdentificacionServices{



    private final String url = "jdbc:postgresql://ec2-54-235-167-210.compute-1.amazonaws.com:5432/d8torhf8i3aipf";
	private final String user = "ksqxlvlwavkjkm";
	private final String password = "1ac34e0a8218bfc0263e6afacc880bbfbc198bec0a984894296e1cddbc3608b2";

	public Connection connect() {
		Connection conn = null;
		try {

			System.out.println("crearla");
			conn = DriverManager.getConnection(url, user, password);

			System.out.println("creada");
			System.out.println("Connected to the PostgreSQL server successfully.");
		} catch (SQLException e) {
			System.out.println(e.getMessage());
		}

		return conn;
	}


	public Boolean Registrar(User usuario){
		boolean correcto = false;
		if(!Autenticar(usuario)){
			System.out.println("entrando a registrar");
			String SQL = "INSERT INTO usuarios(nombre,contrasenia,email) " + "VALUES(?,?,?)";
			try (Connection conn = connect();
				PreparedStatement pstmt = conn.prepareStatement(SQL, Statement.RETURN_GENERATED_KEYS)) {
				pstmt.setString(1, usuario.getNombre());
				pstmt.setString(2, usuario.getMail());
				pstmt.setString(3, usuario.getContrasenia());
				correcto = pstmt.execute();
			} catch (SQLException ex) {
				System.out.println(ex.getMessage());
			}
			return correcto;
		}
		else{
			return false;
		}
		
			
		
	}

    public Boolean Autenticar(User usuario){

		boolean correcto = false;

		String SQL = "select exists(select 1 from usuarios WHERE nombre=(?) and contrasenia = (?))";
		try {
			Connection conn = connect();
			PreparedStatement pstmt = conn.prepareStatement(SQL, Statement.RETURN_GENERATED_KEYS);

			pstmt.setString(1, usuario.getNombre());
			pstmt.setString(2, usuario.getContrasenia());
			System.out.println(usuario.getNombre());
			System.out.println(usuario.getContrasenia());
			
			correcto = pstmt.execute();
		} catch (SQLException ex) {
			
			System.out.println(ex.getMessage());
		}
		
		System.out.println(" si:" + correcto);
		return correcto;
    }


}
