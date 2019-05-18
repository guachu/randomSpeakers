package edu.eci.arsw.randomSpeakers.randomSpeakers.services;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
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

			conn = DriverManager.getConnection(url, user, password);

		} catch (SQLException e) {
			System.out.println(e.getMessage());
		}

		return conn;
	}


	public Boolean Registrar(User usuario){
		boolean correcto = false;
		if(!Autenticar(usuario)){
			String SQL = "INSERT INTO usuarios(nombre,contrasenia,email) " + "VALUES(?,?,?)";
			try (Connection conn = connect();
				PreparedStatement pstmt = conn.prepareStatement(SQL, Statement.RETURN_GENERATED_KEYS)) {
				pstmt.setString(1, usuario.getNombre());
				pstmt.setString(2, usuario.getContrasenia());
				pstmt.setString(3, usuario.getMail());
				int l = pstmt.executeUpdate();
				if (l == 1)
					correcto = true;
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
			correcto = pstmt.execute();
			String res = "";
			if (correcto){
				ResultSet rs = pstmt.executeQuery();
				while (rs.next()) {
					res = rs.getString("exists");
				}
			}
			if (res.equals("t"))
				return true;
			else if (res.equals("f"))
				return false;			
		} catch (SQLException ex) {
			
			System.out.println(ex.getMessage());
		}
		
		return correcto;
    }


}
